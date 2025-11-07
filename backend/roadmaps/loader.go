// roadmaps is an internal package containing all the tools to build a project roadmap
package roadmaps

import (
	"encoding/json"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"log"
	"os"
	"path/filepath"
	"slices"
	"strconv"
)

// MapLoader is a type handling external data input and output
type MapLoader struct {
	// List of folders located under {Settings.Preferences.RoadmapsPath}
	ScannedFolders []string `json:"-"`

	// Content of a roadmap
	//
	// See also: Map
	Content Map `json:"data"`
}

var RoadmapLoader MapLoader // Global variable storing the current roadmap

// Scan searches for every available roadmaps currently located under {Settings.Preferences.RoadmapsPath}
//
// Ignores invalId entries (those without data.json)
func (ml *MapLoader) Scan() []string {
	ml.ScannedFolders = []string{}

	var localMapLoader MapLoader

	var roadmapsPath string = settings.Preferences.RoadmapsPath

	var folders []string = utils.GetFolders(roadmapsPath)

	for _, folderName := range folders {
		var err error

		var dataPath string = filepath.Join(roadmapsPath, folderName, "data.json")

		var roadmapData *os.File

		roadmapData, err = os.Open(dataPath)
		if err == nil {
			jsonParser := json.NewDecoder(roadmapData)

			err = jsonParser.Decode(&localMapLoader)
		}
		defer roadmapData.Close()

		if err != nil {
			log.Printf(utils.WARNING_STR+"[MapLoader.Scan] roadmap \"%s\" is unavailable: %v. Skipping...", folderName, err)
		} else {
			ml.ScannedFolders = append(ml.ScannedFolders, folderName)
		}

	}

	return ml.ScannedFolders
}

// Load reads a given Roadmap located under {Settings.Preferences.RoadmapsPath}/{name}
//
// Parameters:
//   - name: Name of a roadmap, mostly folder names.
func (ml *MapLoader) Load(name string) {
	if slices.Contains(ml.ScannedFolders, name) {
		var dataPath string = filepath.Join(settings.Preferences.RoadmapsPath, name, "data.json")

		var err error

		roadmapData, err := os.Open(dataPath)
		if err == nil {
			jsonParser := json.NewDecoder(roadmapData)

			err = jsonParser.Decode(ml)
		}
		defer roadmapData.Close()

		if err != nil {
			log.Printf(utils.WARNING_STR+"[MapLoader.Load] could not load roadmap: %v", err)
		} else {
			for i := range ml.Content.Elements {
				ml.Content.Elements[i].Id = uint(i)
			}

			ml.Content.Title = name

			log.Printf(utils.INFO_STR + "[MapLoader.Load] loaded roadmap successfully")
		}

	} else {
		log.Printf(utils.WARNING_STR+"[MapLoader.Load] failed to load roadmap \"%s\": does not exist or could not be scanned", name)
	}
}

// Save writes the loaded Roadmap data to a JSON file located under
//
//	{Settings.Preferences.RoadmapsPath}/{MapLoader.Content.Title}/data.json
//
// Behavior:
//   - If the file does not exist, Save attempts to create it (including parent folders)
//   - If every writing attempts fail, the function exits
//   - If writing is successful but JSON encoding fails, nothing happens and user data remains untouched
//   - On success, an info log is emitted
func (ml *MapLoader) Save(isNew bool) {
	var err error
	var dataPath string

	if isNew {
		if slices.Contains(utils.GetFolders(settings.Preferences.RoadmapsPath), ml.Content.Title) {
			var i int = 1
			for slices.Contains(utils.GetFolders(settings.Preferences.RoadmapsPath), ml.Content.Title+" "+strconv.Itoa(i)) {
				i++
			}
			ml.Content.Title = ml.Content.Title + " " + strconv.Itoa(i)
		}
	}

	// Path where the JSON file is located
	dataPath = filepath.Join(settings.Preferences.RoadmapsPath, ml.Content.Title, "data.json")

	roadmapFile, err := os.OpenFile(dataPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[MapLoader.Save] %v", err)

		// Tries to create a new file
		log.Printf(utils.INFO_STR+"[MapLoader.Save] creating %s", dataPath)

		dir := filepath.Dir(dataPath)
		err = os.MkdirAll(dir, 0755)
		if err != nil {
			log.Printf(utils.WARNING_STR+"[MapLoader.Save] could not create folder %s: %v", dir, err)
		}

		roadmapFile, err = os.Create(dataPath)
		if err != nil { // Occurs if user does not have required permissions to modify its environment
			log.Printf(utils.WARNING_STR+"[MapLoader.Save] %v", err)
		}
	}
	defer roadmapFile.Close()

	jsonEncoder := json.NewEncoder(roadmapFile)

	err = jsonEncoder.Encode(ml)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[MapLoader.Save] %v", err)

		// Will never default user data (no overwrite). Unlike {Settings}

		log.Printf(utils.WARNING_STR+"[MapLoader.Save] failed to save roadmap to \"%s\"", dataPath)
	} else {
		log.Printf(utils.INFO_STR+"[MapLoader.Save] successfully saved roadmap to \"%s\"", dataPath)
	}
}

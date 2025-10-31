package roadmaps

import (
	"encoding/json"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"log"
	"os"
	"path/filepath"
	"slices"
)

type MapLoader struct {
	ScannedFolders []string
	Content        Map `json:"data"`
}

var RoadmapLoader MapLoader // Global var storing the roadmaps loaded

// Scans for every available roadmaps currently in the Settings.RoadmapsPath folder
//
// Ignores invalid entries
func (ml *MapLoader) Scan() []string {
	var oldScannedFolders []string = ml.ScannedFolders
	ml.ScannedFolders = []string{}

	var localMapLoader MapLoader

	var roadmapsPath string = settings.Preferences.RoadmapsPath

	var folders []string = utils.GetFolders(roadmapsPath)

	for _, folderName := range folders {
		var err error

		if !slices.Contains(oldScannedFolders, folderName) {

			var dataPath string = filepath.Join(roadmapsPath, folderName, "data.json")

			var roadmapData *os.File

			roadmapData, err = os.Open(dataPath)
			if err == nil {
				jsonParser := json.NewDecoder(roadmapData)

				err = jsonParser.Decode(&localMapLoader)
			}
			defer roadmapData.Close()
		}

		if err != nil {
			log.Printf(utils.WARNING_STR+"[MapLoader.Scan] roadmap \"%s\" is unavailable: %v. Skipping...", folderName, err)
		} else {
			ml.ScannedFolders = append(ml.ScannedFolders, folderName)
		}

	}

	return ml.ScannedFolders
}

// Loads a given Roadmap from Settings.RoadmapsPath/{name}
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
				ml.Content.Elements[i].id = uint(i)
			}

			// format
			if ml.Content.Title != name {
				ml.Content.Title = name
			}

			log.Printf(utils.INFO_STR + "[MapLoader.Load] loaded roadmap successfully")
		}

	} else {
		log.Printf(utils.WARNING_STR+"[MapLoader.Load] could not load roadmap \"%s\": does not exist or could not be scanned", name)
	}
}

// Save loaded Roadmap into Settings.RoadmapsPath/{name}/data.json
func (ml *MapLoader) Save() {
	var err error

	var dataPath string = filepath.Join(settings.Preferences.RoadmapsPath, ml.Content.Title, "data.json")

	roadmapFile, err := os.Open(dataPath)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[MapLoader.Save] %v", err)

		err = nil

		// tries to create a new file
		log.Printf(utils.INFO_STR+"[MapLoader.Save] creating %s", dataPath)
		roadmapFile, err = os.Create(dataPath)
		if err != nil {
			log.Fatalf(utils.FATAL_STR + "[MapLoader.Save] %v")
		}
	}
	defer roadmapFile.Close()

	jsonEncoder := json.NewEncoder(roadmapFile)

	err = jsonEncoder.Encode(ml)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[MapLoader.Save] %v", err)

		// no defaulting for user data (no overwrite)

		log.Printf(utils.WARNING_STR+"[MapLoader.Save] could not save Roadmap into \"%s\"", dataPath)
	} else {
		log.Printf(utils.INFO_STR+"[MapLoader.Save] saved Roadmap into \"%s\"", dataPath)
	}
}

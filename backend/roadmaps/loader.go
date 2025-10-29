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
	scannedFolders []string
	Content        Map `json:"data"`
}

var RoadmapLoader MapLoader // Global var storing the roadmaps loaded

func (ml *MapLoader) Scan() []string {
	var oldScannedFolders []string = ml.scannedFolders
	ml.scannedFolders = []string{}

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

			// format
			if ml.Content.Title != folderName {
				ml.Content.Title = folderName
			}
		}

		if err != nil {
			log.Printf(utils.WARNING_STR+"[MapLoader.Scan] roadmap \"%s\" is unavailable: %v", folderName, err)
		} else {
			ml.scannedFolders = append(ml.scannedFolders, folderName)
		}

	}

	return ml.scannedFolders
}

func (ml *MapLoader) Load(name string) {
	var roadmapsPath string = settings.Preferences.RoadmapsPath

	if slices.Contains(ml.scannedFolders, name) {
		var dataPath string = filepath.Join(roadmapsPath, name, "data.json")

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

			log.Printf(utils.INFO_STR + "[MapLoader.Load] loaded roadmap successfully")
		}

	} else {
		log.Printf(utils.WARNING_STR+"[MapLoader.Load] could not load roadmap \"%s\": does not exist or could not be scanned", name)
	}
}

// MapLoader.Save()

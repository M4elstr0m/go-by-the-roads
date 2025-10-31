package settings

import (
	"encoding/json"
	"go-by-the-roads/backend/utils"
	"log"
	"os"

	"github.com/creasty/defaults"
)

const settingsPath string = "data/settings/settings.json" // default settings path

var Preferences Settings // Global var storing the value of user's settings during runtime

// Struct containing user's settings
//
// Why using `github.com/creasty/defaults` only there you could tell me: because this is an extensive struct (new fields will be added frequently) but the other struct are pretty much hardcoded so I will optimize those myself
type Settings struct {
	// Stores the path of the folder where each roadmap folder are located
	RoadmapsPath string `json:"roadmapsPath" default:"data/roadmaps"`
}

// Returns a Settings struct with default values
func GetDefaultSettings() Settings {
	var new Settings
	new.restoreDefault()
	return new
}

// Restores a Settings struct at its default value
func (stgs *Settings) restoreDefault() {
	log.Printf(utils.INFO_STR + "[Settings.restoreDefault] defaulting Settings")
	err := defaults.Set(stgs)
	if err != nil {
		log.Fatalf(utils.FATAL_STR+"[Settings.restoreDefault] %v", err)
	}
}

// Loads Settings from settings.json
func (stgs *Settings) Load() {
	var err error

	settingsFile, err := os.Open(settingsPath)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[Settings.Load] %v", err)
	} else {
		jsonParser := json.NewDecoder(settingsFile)

		err = jsonParser.Decode(stgs)
		if err != nil {
			log.Printf(utils.WARNING_STR+"[Settings.Load] %v", err)
		}
	}
	defer settingsFile.Close()

	if err != nil { // Restore default values
		stgs.restoreDefault()
		stgs.Save()
	}

	log.Printf(utils.INFO_STR+"[Settings.Load] loaded Settings from \"%v\"", settingsPath)
}

// Save Settings into settings.json
func (stgs *Settings) Save() {
	var err error

	settingsFile, err := os.Open(settingsPath)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[Settings.Save] %v", err)

		err = nil

		// tries to create a new file
		log.Printf(utils.INFO_STR+"[Settings.Save] creating %s", settingsPath)
		settingsFile, err = os.Create(settingsPath)
		if err != nil {
			log.Fatalf(utils.FATAL_STR + "[Settings.Save] %v")
		}
	}
	defer settingsFile.Close()

	jsonEncoder := json.NewEncoder(settingsFile)

	err = jsonEncoder.Encode(stgs)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[Settings.Save] %v", err)

		stgs.restoreDefault()

		log.Printf(utils.WARNING_STR+"[Settings.Save] could not save Settings into \"%s\"", settingsPath)
	} else {
		log.Printf(utils.INFO_STR+"[Settings.Save] saved Settings into \"%s\"", settingsPath)
	}
}

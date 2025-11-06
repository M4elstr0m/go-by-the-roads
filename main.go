package main

import (
	"embed"
	"fmt"
	"go-by-the-roads/backend/app"
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func init() {
	settings.Preferences.Load() // Will create settings.json on first launch if inexistant
	roadmaps.RoadmapLoader.Scan()
	roadmaps.RoadmapLoader.Save()
}

func main() {
	const testingMode bool = false
	if !testingMode {
		// Create an instance of the app structure
		app := app.NewApp()

		// Create application with options
		err := wails.Run(&options.App{
			Title:  "go-by-the-roads",
			Width:  1024,
			Height: 576,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        app.Startup,
			Bind: []interface{}{
				app,
			},
		})

		if err != nil {
			log.Println(utils.FATAL_STR+"[main] error:", err.Error())
		}
	} else {
		log.Println(utils.INFO_STR + "[main] testingMode enabled")

		fmt.Printf("%v\n", settings.Preferences.RoadmapsPath)
		if len(roadmaps.RoadmapLoader.ScannedFolders) != 0 {
			roadmaps.RoadmapLoader.Load(roadmaps.RoadmapLoader.ScannedFolders[0])
		}
		fmt.Printf("%v\n", roadmaps.RoadmapLoader.Content)
	}
}

// Docstring rework

// a default style setting that applies to new roadmaps
// individual style settings for each roadmaps

// Purge branch or idk

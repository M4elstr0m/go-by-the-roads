package main

import (
	"embed"
	"go-by-the-roads/backend/app"
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"go-by-the-roads/backend/version"
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
}

func main() {
	const testingMode bool = false
	if !testingMode {
		// Create an instance of the app structure
		app := app.NewApp()

		// Create application with options
		err := wails.Run(&options.App{
			Title:  "Go By The Roads " + version.CurrentTag + " - By " + version.RepoOwner,
			Width:  1024,
			Height: 576,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 45, G: 49, B: 66, A: 1},
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
	}
}

// Docstring rework

// a default style setting that applies to new roadmaps
// individual style settings for each roadmaps

// Purge branch or idk

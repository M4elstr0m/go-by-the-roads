package main

import (
	"embed"
	"go-by-the-roads/backend/app"
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/settings"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var preferences *settings.Settings = &settings.Preferences
var roadmapLoader *roadmaps.MapLoader = &roadmaps.RoadmapLoader

func init() {
	roadmapLoader.Load()
}

func main() {
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
		log.Println("Error:", err.Error())
	}
}

// load settings (containing path for roadmaps)
// map loader load all roadmaps

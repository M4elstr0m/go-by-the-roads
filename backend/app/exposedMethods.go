package app

import (
	"fmt"
	"go-by-the-roads/backend/roadmaps"
)

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetMapLoader() roadmaps.MapLoader {
	return roadmaps.RoadmapLoader
}

func (a *App) GetFirstSite(ml roadmaps.MapLoader) roadmaps.Site {
	return ml.Content.Elements[0]
}

package utils

import (
	"log"
	"os"

	"github.com/fatih/color"
)

// INFO in green format. For harmless informations
var INFO_STR string = color.New(color.FgGreen).Sprint("INFO") + " "

// WARNING in yellow format. For non-fatal errors
var WARNING_STR string = color.New(color.FgYellow).Sprint("WARNING") + " "

// FATAL in red format. For fatal errors
var FATAL_STR string = color.New(color.FgRed).Sprint("FATAL") + " "

func GetFolders(path string) []string {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Printf(WARNING_STR+"[GetFolders] %v", err)
	}

	var folders []string
	for _, entry := range entries {
		if entry.IsDir() {
			folders = append(folders, entry.Name())
		}
	}

	return folders
}

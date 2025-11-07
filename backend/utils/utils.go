// utils is an internal package containing all the helpful utility tools of the project
package utils

import (
	"log"
	"os"

	"github.com/Bios-Marcel/wastebasket/v2"
	"github.com/fatih/color"
	"github.com/pkg/browser"
)

// INFO in green format. For harmless informations
var INFO_STR string = color.New(color.FgGreen).Sprint("INFO") + " "

// WARNING in yellow format. For non-fatal errors
var WARNING_STR string = color.New(color.FgYellow).Sprint("WARNING") + " "

// FATAL in red format. For fatal errors
var FATAL_STR string = color.New(color.FgRed).Sprint("FATAL") + " "

// GetFolders returns each name of directories inside its parent folder {path}
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

// DeleteFolder removes a given path from the hard drive
func DeleteFolder(path string) {
	err := wastebasket.Trash(path)
	if err != nil {
		log.Printf(WARNING_STR+"[DeleteFolder] failed to delete folder: %s", path)
	}
}

// OpenURL opens a browser tab with the given link
func OpenURL(s string) {
	err := browser.OpenURL(s)
	if err != nil {
		log.Printf(WARNING_STR+"[OpenURL] failed to open URL: %s", s)
	}
}

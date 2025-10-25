package utils

import "github.com/fatih/color"

// WARNING in yellow format
var INFO_STR string = color.New(color.FgGreen).Sprint("INFO") + " "
var WARNING_STR string = color.New(color.FgYellow).Sprint("WARNING") + " "
var FATAL_STR string = color.New(color.FgRed).Sprint("FATAL") + " "

package utils

import "github.com/fatih/color"

// INFO in green format. For harmless informations
var INFO_STR string = color.New(color.FgGreen).Sprint("INFO") + " "

// WARNING in yellow format. For non-fatal errors
var WARNING_STR string = color.New(color.FgYellow).Sprint("WARNING") + " "

// FATAL in red format. For fatal errors
var FATAL_STR string = color.New(color.FgRed).Sprint("FATAL") + " "

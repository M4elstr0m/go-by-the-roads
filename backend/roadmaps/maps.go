package roadmaps

// A map is becoming handy when man needs to find his path
//
// Structure where are stored all the different tasks the user wants to achieve in ascending order
type Map struct {
	Title    string    // Title of the whole roadmap
	Elements SiteSlice // An ordered slice containing each user's Site
}

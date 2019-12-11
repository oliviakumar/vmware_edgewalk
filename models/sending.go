package models

//Edgex info that gets sent
type SendingData struct {
	Identity  string `json:"identity"`
	Accepted  bool `json:"accepted"`
	Location  string `json:"location"`
	Entrytype string `json:"type"`
	Device string `json:"device"`
	Edgexid string `json:"edgexId"`
	Imagepath string
}


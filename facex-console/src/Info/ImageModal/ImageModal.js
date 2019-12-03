import React from "react";
// import "../styles.css";
import img from "../../logos/facex.png"

class ImageModal extends React.Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("clicked");
  };

  render() {
    return (
      <div>
        <img
          className="small"
          src="../../logos/facex.png"
          src={img}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src="../../logos/facex.png"
              src={img}
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
      </div>
    );
  }
}
export default ImageModal;

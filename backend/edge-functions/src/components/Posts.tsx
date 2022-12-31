import Image from "next/image";
import { Embed, Accordion, Card, Modal } from "semantic-ui-react";
import { useState } from "react";

function instagramVideoToEmbed(url: string) {
  const videoId = url
    .replace(/(\/)*$/, "")
    .split("/")
    .slice(-1)[0];

  return (
    <iframe
      style={{
        border: "0px",
        minWidth: "100%",
        minHeight: "100vh",
      }}
      src={`https://www.instagram.com/p/${videoId}/embed`}
      allowFullScreen
    ></iframe>
  );
}

export default function Post() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="ui styled fluid">
      <Modal onClose={() => setModalOpen(false)} onOpen={() => setModalOpen(true)} open={modalOpen}>
        <Modal.Header>Post #???</Modal.Header>
        <Modal.Content>
          <Embed
            className="fullscreen"
            id="QHbK9C5mA94"
            placeholder="https://img.youtube.com/vi/QHbK9C5mA94/mqdefault.jpg"
            source="youtube"
            iframe={{
              allowFullScreen: true,
            }}
          ></Embed>
        </Modal.Content>
      </Modal>
      <div className="ui divided items link" style={{ minWidth: "80vw" }}>
        <div
          className="item link-hover"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <div className="image" style={{ alignSelf: "center" }}>
            <Image
              alt=""
              style={{ maxHeight: "100px", borderRadius: "5px" }}
              src="https://www.instagram.com/p/CjxXTbmISOd/media/?size=l"
              height={100}
              width={100}
            />
          </div>
          <div className="content">
            <div className="metadata">
              <span className="date">Yesterday at 12:30AM</span>
            </div>
            <a className="header">12 Years a Slave</a>
            <div className="meta">
              <span className="cinema">Union Square 14</span>
            </div>
            <div className="description">
              <p></p>
            </div>
            <div className="extra">
              <div className="ui label">IMAX</div>
              <div className="ui label">
                <i className="volume off icon"></i> No sound
              </div>
            </div>
          </div>
        </div>
        <div
          className="item link-hover"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <div className="image" style={{ alignSelf: "center" }}>
            <Image
              style={{ maxHeight: "100px", borderRadius: "5px" }}
              alt=""
              src="https://img.youtube.com/vi/o_PBfLbd3zw/mqdefault.jpg"
              height={100}
              width={100}
            />
          </div>
          <div className="content">
            <div className="metadata">
              <span className="date">Yesterday at 12:30AM</span>
            </div>
            <a className="header">My Neighbor Totoro</a>
            <div className="meta">
              <span className="cinema">IFC Cinema</span>
            </div>
            <div className="description">
              <p></p>
            </div>
            <div className="extra"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

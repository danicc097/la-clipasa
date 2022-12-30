import Image from "next/image";

export default function Post() {
  return (
    <div className="ui divided items" style={{ minWidth: "80vw" }}>
      <div className="item">
        <div className="image" style={{ alignSelf: "center" }}>
          <Image
            alt=""
            src="https://img.youtube.com/vi/QHbK9C5mA94/mqdefault.jpg"
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
      <div className="item">
        <div className="image" style={{ alignSelf: "center" }}>
          <Image
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
          <div className="extra">
            <div className="ui right floated primary button">
              Buy tickets
              <i className="right chevron icon"></i>
            </div>
            <div className="ui label">Limited</div>
          </div>
        </div>
      </div>
    </div>
  );
}

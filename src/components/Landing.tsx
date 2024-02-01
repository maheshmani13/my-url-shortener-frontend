import { useState } from "react";

const Landing = () => {
  const active =
    "p-3 mt-2 rounded-md bg-white text-blue-500 text-xl font-ubuntu";
  const inactive = "p-3 mt-2 rounded-md bg-gray  text-xl font-ubuntu";
  const [shortLink, setShortLink] = useState("");
  const [originial_url, setOriginial_url] = useState("");
  const [clicks, Setclicks] = useState("");
  const [shortnedLink, setShortnedLink] = useState("");
  const [tabtoggel, setTabtoggel] = useState(false);
  const fetchClicks = async () => {
    Setclicks("");
    if (shortnedLink === "") {
      alert("Please enter a short URL");
      return;
    }
    const shorturl_id =
      shortnedLink.split("/")[shortnedLink.split("/").length - 1];
    const res = await fetch(
      `https://my-url-shortner.onrender.com/analytics/clicks/${shorturl_id}`
    );
    const data = await res.json();
    Setclicks(data.message);
  };
  const fetchNewUrl = async () => {
    setShortLink("");
    if (originial_url === "") {
      alert("Please enter a URL");
      return;
    }
    const res = await fetch(`https://my-url-shortner.onrender.com/url/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originial_url,
      }),
    });
    const data = await res.json();
    setShortLink(
      `https://my-url-shortner.onrender.com/url/${data.message.url_string}`
    );
  };
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <div className="text-6xl flex  font-semibold text-gray-800 font-ubuntu">
        Make every&nbsp;
        <p className="text-blue-500"> {"connection"}&nbsp; </p> count
      </div>
      <div className="mt-4 flex flex-col text-2xl justify-center items-center text-gray-400 font-ubuntu">
        <div>
          Create short links, QR Codes, and Link-in-bio pages. Share them
          anywhere.
        </div>
        <p>
          {" "}
          Track what’s working, and what’s not. All inside the Our Connections
          Platform
        </p>
      </div>

      <div className=" flex gap-5 w-4/5 items-left mt-16  rounded-t-xl bg-gray-100 pb-12 px-16 ">
        <button
          className={tabtoggel ? inactive : active}
          onClick={() => {
            setTabtoggel(false);
          }}
        >
          URL Shortening
        </button>
        <button
          onClick={() => {
            setTabtoggel(true);
          }}
          className={tabtoggel ? active : inactive}
        >
          Analyitics
        </button>
      </div>

      <div className=" flex flex-col w-4/5 items-left  h-1/2 rounded-b-xl bg-gray-100 border-gray-100 p-16 pt-0">
        {!tabtoggel && (
          <>
            <h2 className="text-4xl font-ubuntu py-2">Shorten a Longer Link</h2>
            <h3 className="text-2xl font-ubuntu py-2">Paste a long URL</h3>

            <input
              value={originial_url}
              onChange={(e) => setOriginial_url(e.target.value)}
              className="w-full mr-20 py-4 px-4 mt-2 rounded-md"
              type="text"
              placeholder="Example : https://www.longlink.com/longer-link/12345678/"
            />
            <div className="flex justify-center">
              <button
                onClick={fetchNewUrl}
                className="mt-8 p-x-4 w-48 rounded-lg font-ubuntu py-2 bg-gray-300 hover:bg-gray-200"
              >
                Get Shortened Link
              </button>
            </div>
            {shortLink !== "" ? (
              <div className="flex text-xl mt-10 gap-5 items-center justify-center m-3 ">
                <div className=""> Your New Short URL </div>
                <div>{shortLink}</div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {tabtoggel && (
          <>
            <h2 className="text-4xl font-ubuntu py-2">Get Number Of Clicks</h2>
            <h3 className="text-2xl font-ubuntu py-2">Paste your short URL</h3>
            <input
              value={shortnedLink}
              onChange={(e) => setShortnedLink(e.target.value)}
              className="w-full mr-20 py-4 px-4 mt-2 rounded-md"
              type="text"
              placeholder="Example : https://my-url-shortner.onrender.com/xxxxxxxx"
            />
            <div className="flex justify-center">
              <button
                onClick={fetchClicks}
                className="mt-8 p-x-4 w-48 rounded-lg font-ubuntu py-2 bg-gray-300 hover:bg-gray-200"
              >
                Get Clicks
              </button>
            </div>
            {clicks !== "" ? (
              <div className="flex text-xl mt-10 gap-5 items-center justify-center m-3 ">
                <div className=""> Number of Clicks on Your short Url </div>
                <div>{clicks}</div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;

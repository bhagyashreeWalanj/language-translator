import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faVolumeHigh,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import Footer from "./Footer";

export default function Translate() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("de-DE");
  const [copySuccess, setCopySuccess] = useState("");

  const handletranslateFromChange = (event) => {
    setTranslateFrom(event);
  };
  const handletranslateToChange = (event) => {
    setTranslateTo(event);
  };

  const onClickExchangeText = () => {
    setToText(fromText);
    setFromText(toText);
    setTranslateTo(translateFrom);
    setTranslateFrom(translateTo);
  };

  const handleKeyUpFromText = (e) => {
    if (!fromText) {
      setToText("");
    }
  };
  const handeTranslation = async () => {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
    const response = await fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
      });
  };

  const copyToClipBoard = async (copyMe) => {
    console.log("hhbsdjsbdj ----", copyMe);
    try {
      await navigator.clipboard.writeText(copyMe);
      alert("Copied!");
    } catch (err) {
      alert("Failed to copy!");
    }
  };

  const handleVoiceText = async (voiceText) => {
    let utterance = "";
    const synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance(voiceText);

    synth.speak(utterance);
  };

  return (
    <>
      {" "}
      <h1 className="header">Global Translation</h1>
      <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              name="from-text"
              id=""
              cols="30"
              rows="10"
              className="from-text"
              placeholder="Enter Text"
              spellCheck="false"
              value={fromText}
              onKeyUp={(e) => handleKeyUpFromText(e)}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>

            <textarea
              name="to-text"
              className="to-text"
              spellCheck="false"
              placeholder="Translation"
              readOnly
              id=""
              value={toText}
              onChange={(e) => setToText(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <FontAwesomeIcon
                  icon={faVolumeHigh}
                  id="from"
                  title="Voice Text"
                  className="highlight"
                  onClick={() => handleVoiceText(fromText)}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  id="copyFrom"
                  title="Copy From"
                  onClick={() => copyToClipBoard(fromText)}
                  className="highlight"
                />
              </div>
              <Dropdown
                id={"select_from"}
                selected={translateFrom}
                onChangeFn={(e) => handletranslateFromChange(e)}
              ></Dropdown>
            </li>
            <li className="exchange">
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                id="exchangeIcon"
                title="swap language"
                onClick={onClickExchangeText}
              />
            </li>
            <li className="row to">
              <Dropdown
                id="select_to"
                selected={translateTo}
                onChangeFn={(e) => handletranslateToChange(e)}
              ></Dropdown>
              <div className="icons">
                <FontAwesomeIcon
                  icon={faVolumeHigh}
                  id="to"
                  title="Voice Text"
                  className="highlight"
                  onClick={() => handleVoiceText(toText)}
                />
                <FontAwesomeIcon
                  icon={faCopy}
                  title="Copy To"
                  id="copyTo"
                  className="highlight"
                  onClick={() => copyToClipBoard(toText)}
                />
              </div>
            </li>
          </ul>
        </div>
        <button type="submit" onClick={handeTranslation}>
          Translate
        </button>
      </div>
      <Footer />
    </>
  );
}

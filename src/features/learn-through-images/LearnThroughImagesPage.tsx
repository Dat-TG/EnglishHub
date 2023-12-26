import { useEffect, useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./style.css";
import { useTranslation } from "react-i18next";

function LearnThroughImagesPage() {
  const { t } = useTranslation("global");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [results, setResults] = useState<
    | {
        className: string;
        probability: number;
      }[]
    | undefined
  >([]);
  const [history, setHistory] = useState<string[]>([]);

  const imageRef = useRef<HTMLImageElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files!.length > 0) {
      const url = URL.createObjectURL(files![0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const identify = async () => {
    console.log("identify");
    if (isModelLoading) {
      return;
    }
    textInputRef.current!.value = "";
    const results = await model?.classify(imageRef.current!);
    setResults(results);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (imageURL && !history.includes(imageURL)) {
      setHistory([imageURL, ...history]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  return (
    <div
      className="App"
      style={{
        margin: "auto",
      }}
    >
      <h1 className="header">{t("imageIdentification")}</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={triggerUpload}>
          {t("uploadImage")}
        </button>
        <span className="or">{t("or")}</span>
        <input
          type="text"
          placeholder={t("pasteImageURL")}
          ref={textInputRef}
          onChange={handleOnChange}
        />
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && (
              <img
                src={imageURL}
                alt="Upload Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>
          {results && results.length > 0 && (
            <div className="resultsHolder">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      {t("confidenceLevel")}:{" "}
                      {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && (
                        <span className="bestGuess">{t("bestGuess")}</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imageURL && (
          <button className="button" onClick={identify}>
            {isModelLoading ? t("modelLoading") : t("identifyImage")}
          </button>
        )}
      </div>
      {history.length > 0 && (
        <div className="recentPredictions">
          <h2>{t("recentImages")}</h2>
          <div className="recentImages">
            {history.map((image, index) => {
              return (
                <div className="recentPrediction" key={`${image}${index}`}>
                  <img
                    src={image}
                    alt="Recent Prediction"
                    onClick={() => setImageURL(image)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnThroughImagesPage;

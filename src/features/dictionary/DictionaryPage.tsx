import { Search } from "@mui/icons-material";
import { Paper, IconButton, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IWord, IWordNotFound } from "../../types/dictionary";
import { searchWord } from "../../config/api/dictionary/apiDictionary";
import { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function DictionaryPage() {
  const { t } = useTranslation("global");
  const [word, setWord] = useState("");
  const [wordFound, setWordFound] = useState<IWord>();
  const [wordNotFound, setWordNotFound] = useState<IWordNotFound>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log("search");
    if (!searchParams.has("q")) return;
    setWord(searchParams.get("q")!);
    searchWord(searchParams!.get("q")!)
      .then((res: AxiosResponse) => {
        if (res.status == 200) {
          setWordFound(res.data[0] as IWord);
        } else if (res.status == 404) {
          setWordNotFound(res.data as IWordNotFound);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams]);
  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("searchDictionary")}
          inputProps={{ "aria-label": "search dictionary" }}
          value={word}
          onChange={(event) => {
            setWord(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              navigate("/dictionary?q=" + word);
            }
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={async () => {
            navigate("/dictionary?q=" + word);
          }}
        >
          <Search />
        </IconButton>
      </Paper>
      {wordFound && (
        <div>
          <h1>{wordFound.word}</h1>
          <p>{wordFound.meanings[0].definitions[0].definition}</p>
        </div>
      )}
      {wordNotFound && (
        <div>
          <p>{wordNotFound.message}</p>
        </div>
      )}
    </div>
  );
}

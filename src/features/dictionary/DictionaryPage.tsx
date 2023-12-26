import { Search, VolumeUpRounded } from "@mui/icons-material";
import { Paper, IconButton, InputBase, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IWord, IWordNotFound } from "../../types/dictionary";
import { searchWord } from "../../config/api/dictionary/apiDictionary";
import { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function DictionaryPage() {
  const { t } = useTranslation("global");
  const [word, setWord] = useState("");
  const [wordFound, setWordFound] = useState<IWord[]>();
  const [wordNotFound, setWordNotFound] = useState<IWordNotFound>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log("search");
    if (!searchParams.has("q")) return;
    setWord(searchParams.get("q")!);
    searchWord(searchParams!.get("q")!)
      .then((res: AxiosResponse) => {
        setWordFound(res.data as IWord[]);
        setWordNotFound(undefined);
      })
      .catch((err) => {
        console.log(err);
        setWordFound(undefined);
        setWordNotFound({
          title: t("wordNotFoundTitle"),
          message: t("wordNotFoundMessage"),
          resolution: t("wordNotFoundResolution"),
        } as IWordNotFound);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{
        padding: "32px",
        gap: "32px",
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
          <Typography variant="h1">{wordFound[0].word}</Typography>
          {wordFound[0].phonetics
            .filter((e) => e.audio != "")
            .map((phonetic, index) => (
              <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                alignItems={"center"}
                key={`sound${index}`}
              >
                <IconButton
                  onClick={() => {
                    new Audio(phonetic.audio).play();
                  }}
                >
                  <VolumeUpRounded color="primary" />
                </IconButton>
                <Typography variant="subtitle1">{phonetic.text}</Typography>
              </Box>
            ))}
        </div>
      )}
      {wordFound &&
        wordFound.map((wordFound, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"column"}
            gap={"32px"}
          >
            {wordFound.meanings.map((meaning, index) => (
              <Box
                key={`meaning${index}`}
                display={"flex"}
                flexDirection={"column"}
                gap={"16px"}
              >
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  {meaning.partOfSpeech}
                </Typography>
                {meaning.definitions.map((definition, index) => (
                  <Box
                    key={`definition${index}`}
                    sx={{
                      marginBottom: "16px",
                    }}
                  >
                    <Typography variant="body1">
                      {definition.definition}
                    </Typography>
                    {definition.example && (
                      <Box display={"flex"} flexDirection={"row"} gap={"8px"}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.main",
                            fontWeight: "bold",
                          }}
                        >
                          Example:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: "italic",
                          }}
                        >
                          {definition.example}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      {wordNotFound && (
        <div>
          <Typography variant="h1">{wordNotFound.title}</Typography>
          <Typography variant="subtitle1">{wordNotFound.message}</Typography>
          <Typography variant="subtitle1">{wordNotFound.resolution}</Typography>
        </div>
      )}
    </Box>
  );
}

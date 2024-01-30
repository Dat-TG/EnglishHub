import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkGrammar } from "../../config/api/chatgpt/apiChatGPT";
import toast from "../../utils/toast";
import { IGrammarCheckResult } from "../../types/grammar";
import MistakeHighlighter from "./MistakeHighlighter";
import { ContentCopy } from "@mui/icons-material";

export default function GrammarCheckPage() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<IGrammarCheckResult>();
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (value: string) => {
    console.log(value);
    setIsLoading(true);
    checkGrammar(value)
      .then((res) => {
        setResult(res);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    document.title = t("grammarCheck");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        {t("grammarCheck")}
      </h1>
      <Button
        variant="outlined"
        sx={{
          width: "100px",
          alignSelf: "center",
        }}
        onClick={() => onSubmit(value)}
      >
        {isLoading ? <CircularProgress size={24} /> : t("check")}
      </Button>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography variant="h6">{t("inputParagraph")}</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              e.target.style.height = "auto"; // Reset the height to auto to correctly calculate the new height
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to fit the content
            }}
            sx={{
              mt: 2,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <Typography variant="h6">{t("outputParagraph")}</Typography>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(result?.outputParagraph || "");
                toast.simple(t("copiedToClipboard"));
              }}
            >
              <ContentCopy />
            </IconButton>
          </div>
          {result && (
            <MistakeHighlighter
              outputParagraph={result.outputParagraph}
              mistakes={result.mistakes}
            />
          )}
        </Grid>
      </Grid>
      {result &&
        result.mistakes &&
        result.mistakes.map((mistake, index) => {
          return (
            <div
              key={`mistake-${index}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography variant="body1">
                {index + 1}. {t("wrongWord")}:{" "}
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {mistake.wrongWord}
                </span>
              </Typography>
              <Typography variant="body1">
                {t("shortDescription")}: {mistake.shortDescription}
              </Typography>
              <Typography variant="body1">
                {t("description")}: {mistake.description}
              </Typography>
              <Typography variant="body1">
                {t("replacement")}:{" "}
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {mistake.replacement}
                </span>
              </Typography>
            </div>
          );
        })}
    </div>
  );
}

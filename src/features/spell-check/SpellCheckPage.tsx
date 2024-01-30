import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TextDiff from "./TextDiff";
import MicNoneIcon from "@mui/icons-material/MicNone";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useTranslation } from "react-i18next";

const SpellingCheckPage = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { t } = useTranslation("global");

  if (!browserSupportsSpeechRecognition) {
    return <span>{t("notSupportSpeech")}</span>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [targetTranscript, setTargetTranscript] = useState<string>("");
  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <>
      <h1 style={{ marginTop: "24px", textAlign: "center" }}>
        {" "}
        {t("spellingCheck")}
      </h1>
      <Box sx={{ m: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Typography variant="h6">{t("targetTranscript")}</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={targetTranscript}
              onChange={(e) => setTargetTranscript(e.target.value)}
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              {t("speechToText")}
            </Typography>

            <Box
              sx={{
                border: "1px solid darkGray",
                borderRadius: "4px",
                height: "200px",
                padding: 1.5,
                overflowY: "auto",
              }}
            >
              <Typography>{transcript}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              {!listening ? (
                <Button
                  variant="contained"
                  endIcon={<MicNoneIcon />}
                  onClick={handleStartListening}
                >
                  {t("startRecording")}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<RadioButtonCheckedIcon />}
                  onClick={handleStopListening}
                >
                  {t("stopRecording")}
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{t("comparision")}</Typography>
            <Box>
              <TextDiff
                text1={targetTranscript.toLowerCase()}
                text2={transcript.toLowerCase()}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default SpellingCheckPage;

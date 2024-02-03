import React, { useEffect, useState } from "react";
import { Typography, Link, Paper, Grid, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeveloperInfo {
  id: string;
  name: string;
  github: string;
}

const AboutPage: React.FC = () => {
  const [developers, setDevelopers] = useState<DeveloperInfo[]>([]);
  const { t } = useTranslation("global");

  useEffect(() => {
    // Fetch the developer information
    const fetchedDevelopers: DeveloperInfo[] = [
      {
        id: "20120454",
        name: "Lê Công Đắt",
        github: "Dat-TG",
      },
      {
        id: "20120537",
        name: "Hồ Trung Nguyên",
        github: "hotrungnguyen76",
      },
    ];
    setDevelopers(fetchedDevelopers);
  }, []);

  return (
    <div
      style={{
        padding: "32px",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        {t("about")}
      </Typography>
      <Grid container spacing={3} justifyContent={"center"} marginTop={"16px"}>
        {developers.map((developer, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper style={{ padding: "16px", textAlign: "center" }}>
              <Avatar
                src={`https://avatars.githubusercontent.com/${developer.github}`}
                alt={`${developer.name}'s GitHub Avatar`}
                style={{ width: "100px", height: "100px", margin: "auto" }}
              />
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "8px" }}
              >
                {developer.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                ID: {developer.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                GitHub:{" "}
                <Link
                  href={`https://github.com/${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {developer.github}
                </Link>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AboutPage;

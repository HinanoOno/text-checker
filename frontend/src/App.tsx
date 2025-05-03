import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Tabs,
  Tab,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";

function App() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const maxLength = 800;

  const handleCorrection = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      console.log("校正結果:", data);
      setCorrectedText(data.corrected);
    } catch (err) {
      console.error("校正中にエラー:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        文章校正ツール
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardHeader title="文章を入力" subheader={`最大 ${maxLength} 文字`} />
        <CardContent>
          <TextField
            label="校正したい文章"
            multiline
            fullWidth
            minRows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength }}
            helperText={`${text.length}/${maxLength} 文字`}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCorrection}
            disabled={!text || isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "校正する"}
          </Button>
        </CardActions>
      </Card>

      {correctedText && (
        <Card>
          <CardHeader title="校正結果" />
          <CardContent>
            <Tabs value={tabValue} onChange={(_, newVal) => setTabValue(newVal)} centered>
              <Tab label="差分表示" />
              <Tab label="並べて表示" />
            </Tabs>

            {tabValue === 0 && (
              <Box sx={{ mt: 2 }}>
                {/* 差分表示部分、必要に応じて独自DiffViewコンポーネントを使ってください */}
                <Typography>{correctedText}</Typography>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Box flex={1}>
                  <Typography variant="subtitle1" gutterBottom>元の文章</Typography>
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2, minHeight: 150, whiteSpace: "pre-wrap" }}>
                    {text}
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" gutterBottom>校正後の文章</Typography>
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2, minHeight: 150, whiteSpace: "pre-wrap" }}>
                    {correctedText}
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default App;

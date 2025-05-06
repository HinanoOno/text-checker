import { useState } from "react";
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
import { diffWords, Change } from "diff";

function App() {
  const [text, setText] = useState<string>("");
  const [correctedText, setCorrectedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [diff, setDiff] = useState<Change[]>([]);
  const maxLength = 800;

  const handleCorrection = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data: { original: string; checked: string } = await res.json();
      console.log("校正結果:", data);
      setCorrectedText(data.checked);
      const differences = diffWords(data.original, data.checked);
      console.log("差分:", differences);
      setDiff(differences);
    } catch (err) {
      console.error("校正中にエラー:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        文章表現校正ツール
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardHeader title="文章を入力してください" />
        <CardContent>
          <TextField
            label="校正したい文章"
            multiline
            fullWidth
            minRows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
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
            <Tabs
              value={tabValue}
              onChange={(_, newVal) => setTabValue(newVal)}
              centered
            >
              <Tab label="差分表示" />
              <Tab label="並べて表示" />
            </Tabs>

            {tabValue === 0 && (
              <Box sx={{ mt: 2 }}>
                {diff.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    sx={{
                      backgroundColor: part.added
                        ? "#c8e6c9"
                        : part.removed
                        ? "#ffcdd2"
                        : "transparent",
                      textDecoration: part.removed ? "line-through" : "none",
                    }}
                  >
                    {part.value}
                  </Typography>
                ))}
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Box flex={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    元の文章
                  </Typography>
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2, whiteSpace: "pre-wrap" }}>
                    {text}
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    校正後の文章
                  </Typography>
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2, whiteSpace: "pre-wrap" }}>
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
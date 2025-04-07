package aireview

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"os"

	genai "github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type Content struct{
    Parts []string `json:Parts`
    Role string `json:Role`
} 
type Candidates struct {
    Content *Content `json:Content`
}
type ContentResponse struct{
    Candidates *[]Candidates `json:Candidates`
}

func Gemini_Request(code string) (string, error){
	// Access your API key as an environment variable 
	log.Println("HIT GEMINI")
	err := godotenv.Load(".env")
	if err != nil {
		return "", errors.New("Error loading .env file")
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return "", errors.New("GEMINI_API_KEY environment variable is not set!")
	}
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		return "", errors.New("Error with gemini.NewClient")
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.0-flash-thinking-exp-01-21")
	resp, err := model.GenerateContent(ctx, genai.Text(`You are an expert software engineer and teacher. Review the following code for correctness, clarity, performance, security, and best practices.
		Return your feedback in well-organized Markdown using multiple sections:
		Summary
			Briefly describe what the code appears to do.
		What's Good
			Highlight strengths and positive aspects.
		Issues / Bugs
			Point out any errors or potential bugs with explanations.
		Suggestions for Improvement
			Explain ways to improve the code structure, performance, readability, or style.
			Be specific and constructive.
		Security Concerns (if any)
			Mention any possible vulnerabilities or safety issues.
		Cleaned-up Version (if applicable)
			If possible, include a revised version of the code incorporating your suggestions.
			Make sure all sections use Markdown formatting properly (e.g., headers, bullet points, code blocks).
			Aim to be clear, friendly, and professional, as if giving feedback to a peer:\n`+code))
	if err != nil {
		return "", err
	}
	marshalResponse, _ := json.MarshalIndent(resp, "", "  ")
	var generateResponse ContentResponse
	if err := json.Unmarshal(marshalResponse, &generateResponse); err !=nil{
		log.Fatal(err)
	}
	var whole string
	for _, cad := range *generateResponse.Candidates{
		if cad.Content !=nil{
			for _, part := range cad.Content.Parts{
				whole += part
			}
		}
	}
	return whole, nil 
}


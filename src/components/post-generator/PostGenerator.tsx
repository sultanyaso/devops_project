import React from 'react';
import { Bot, Send, RefreshCw, Copy, Check } from 'lucide-react';
import PostTemplate from './PostTemplate';
import ToneSelector from './ToneSelector';
import HashtagSuggestions from './HashtagSuggestions';

export default function PostGenerator() {
  const [topic, setTopic] = React.useState('');
  const [selectedTemplate, setSelectedTemplate] = React.useState('achievement');
  const [tone, setTone] = React.useState('professional');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated API call to GPT
    setTimeout(() => {
      const content = generateSampleContent(selectedTemplate, tone);
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Generate LinkedIn Post</h2>
        <Bot className="h-6 w-6 text-indigo-600" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would you like to post about?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Recent project completion, New certification..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <PostTemplate
          selected={selectedTemplate}
          onSelect={setSelectedTemplate}
        />

        <ToneSelector
          selected={tone}
          onSelect={setTone}
        />

        <button
          onClick={handleGenerate}
          disabled={!topic || isGenerating}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin h-5 w-5 mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Generate Post
            </>
          )}
        </button>

        {generatedContent && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Generated Post</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="whitespace-pre-wrap text-gray-800">{generatedContent}</p>
            </div>
            <HashtagSuggestions topic={topic} />
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Bot, Send, RefreshCw, Copy, Check } from 'lucide-react';
import PostTemplate from './PostTemplate';
import ToneSelector from './ToneSelector';
import HashtagSuggestions from './HashtagSuggestions';
import { generatePostContent, generateHashtags } from '../../services/geminiService';

export default function PostGenerator() {
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('achievement');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const [content, tags] = await Promise.all([
        generatePostContent(topic, selectedTemplate, tone),
        generateHashtags(topic)
      ]);
      
      setGeneratedContent(content);
      setHashtags(tags);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullContent = `${generatedContent}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Generate LinkedIn Post</h2>
        <Bot className="h-6 w-6 text-blue-400" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What would you like to post about?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Recent project completion, New certification..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
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

        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!topic || isGenerating}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <h3 className="text-lg font-medium text-white">Generated Post</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="whitespace-pre-wrap text-gray-300">{generatedContent}</p>
              {hashtags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-200"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
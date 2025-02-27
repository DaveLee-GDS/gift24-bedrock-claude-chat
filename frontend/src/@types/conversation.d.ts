export type Role = 'system' | 'assistant' | 'user';
export type Model =
  | 'claude-instant-v1'
  | 'claude-v2'
  | 'claude-v3-opus'
  | 'claude-v3-sonnet'
  | 'claude-v3.5-sonnet'
  | 'claude-v3.5-sonnet-v2'
  | 'claude-v3-haiku'
  | 'claude-v3.5-haiku'
  | 'mistral-7b-instruct'
  | 'mixtral-8x7b-instruct'
  | 'mistral-large'
  | 'amazon-nova-pro'
  | 'amazon-nova-lite'
  | 'amazon-nova-micro';

export type Content = TextContent | ImageContent | AttachmentContent;

export type TextContent = {
  contentType: 'text';
  body: string;
};

export type ImageContent = {
  contentType: 'image';
  mediaType?: string;
  body: string;
};

export type AttachmentContent = {
  contentType: 'attachment';
  fileName?: string;
  body: string;
};

export type ToolUseContent = {
  contentType: 'toolUse';
  body: ToolUseContentBody;
};

export type ToolResultContent = {
  contentType: 'toolResult';
  body: ToolResultContentBody;
};

export type UsedChunk = {
  content: string;
  contentType: 's3' | 'url' | 'youtube';
  source: string;
  rank: number;
};

export type ToolUseContentBody = {
  toolUseId: string;
  name: string;
  input: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type AgentToolResultTextContent = {
  text: string;
};

export type AgentToolResultJsonContent = {
  json: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type AgentToolResultContent = AgentToolResultTextContent | AgentToolResultJsonContent;

export type ToolResultContentBody = {
  toolUseId: string;
  content: AgentToolResultContent[];
  status: 'success' | 'error';
};

export type SimpleMessageContent = TextContent | ToolUseContent | ToolResultContent;

export type SimpleMessage = {
  role: Role;
  content: SimpleMessageContent[];
};

export type MessageContent = {
  role: Role;
  content: Content[];
  model: Model;
  feedback: null | Feedback;
  usedChunks: null | UsedChunk[];
  thinkingLog: null | SimpleMessage[];
};

export type RelatedDocument = {
  content: AgentToolResultContent;
  sourceId: string;
  sourceName?: string;
  sourceLink?: string;
};

export type DisplayMessageContent = MessageContent & {
  id: string;
  parent: null | string;
  children: string[];
  sibling: string[];
};

export type PostMessageRequest = {
  conversationId?: string;
  message: MessageContent & {
    parentMessageId: null | string;
  };
  botId?: string;
  continueGenerate?: bool;
};

export type PostMessageResponse = {
  conversationId: string;
  createTime: number;
  message: MessageContent;
};

export type ConversationMeta = {
  id: string;
  title: string;
  createTime: number;
  lastMessageId: string;
  model: Model;
  botId?: string;
};

export type MessageMap = {
  [messageId: string]: MessageContent & {
    children: string[];
    parent: null | string;
  };
};

export type Conversation = ConversationMeta & {
  messageMap: MessageMap;
  shouldContinue: boolean;
};

export type PutFeedbackRequest = {
  thumbsUp: boolean;
  category: null | string;
  comment: null | string;
};

export type Feedback = {
  thumbsUp: boolean;
  category: string;
  comment: string;
};

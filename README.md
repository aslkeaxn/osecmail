## Usage

```typescript
import osecmail from "osecmail";
```

## Type Definitions

```typescript
type MailboxMessage = {
  id: number;
  from: string;
  subject: string;
  date: string;
};

type Attachment = {
  filename: string;
  contentType: string;
  size: number;
};

type Message = MailboxMessage & {
  attachments: Attachment[];
  body: string;
  textBody: string;
  htmlBody: string;
};

function generateRandomMailboxes(count: number): Promise<string[]>;

function getActiveDomainLists(): Promise<string[]>;

function getMessages(login: string, domain: string): Promise<MailboxMessage[]>;

function getMessage(
  login: string,
  domain: string,
  id: number
): Promise<Message>;
```

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

enum Err {
  generateRandomMailboxes1 = "Received JSON is not an array",
  generateRandomMailboxes2 = "Received array's length is not equal to what was expected",
  generateRandomMailboxes3 = "Some of the received array's elements are not strings",
  getActiveDomainLists1 = "Received JSON is not an array",
  getActiveDomainLists2 = "Some of the received array's elements are not strings",
  getMessages1 = "Received JSON is not an array",
  getMessages2 = "Some of the received array's elements are not objects",
  getMessages3 = "Some of the received array's elements are missing some fields",
  getMessage1 = "Received JSON is not an object",
  getMessage2 = "The received object is missing some fields",
}

function generateRandomMailboxes(count: number): Promise<string[]>;

function getActiveDomainLists(): Promise<string[]>;

function getMessages(login: string, domain: string): Promise<MailboxMessage[]>;

function getMessage(
  login: string,
  domain: string,
  id: number
): Promise<Message>;
```

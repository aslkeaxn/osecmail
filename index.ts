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

const baseUrl = "https://www.1secmail.com/api/v1";

async function generateRandomMailboxes(count: number) {
  const action = "genRandomMailbox";
  const url = `${baseUrl}/?action=${action}&count=${count}`;
  const res = await fetch(url);
  const mailboxes = await res.json();

  if (!Array.isArray(mailboxes)) {
    throw new Error(Err.generateRandomMailboxes1);
  }

  if (mailboxes.length !== count) {
    throw new Error(Err.generateRandomMailboxes2);
  }

  mailboxes.forEach((e) => {
    if (typeof e !== "string") {
      throw new Error(Err.generateRandomMailboxes3);
    }
  });

  return mailboxes as string[];
}

async function getActiveDomainLists() {
  const action = "getDomainList";
  const url = `${baseUrl}/?action=${action}`;
  const res = await fetch(url);
  const activeDomains = await res.json();

  if (!Array.isArray(activeDomains)) {
    throw new Error(Err.getActiveDomainLists1);
  }

  activeDomains.forEach((e) => {
    if (typeof e !== "string") {
      throw new Error(Err.getActiveDomainLists2);
    }
  });

  return activeDomains as string[];
}

async function getMessages(login: string, domain: string) {
  const action = "getMessages";
  const url = `${baseUrl}/?action=${action}&login=${login}&domain=${domain}`;
  const res = await fetch(url);
  const messages = await res.json();

  if (!Array.isArray(messages)) {
    throw new Error(Err.getMessages1);
  }

  messages.forEach((e) => {
    if (typeof e !== "object") {
      throw new Error(Err.getMessages2);
    }

    const keys = new Set(Object.keys(e));

    if (
      !keys.has("id") ||
      !keys.has("from") ||
      !keys.has("subject") ||
      !keys.has("date")
    ) {
      throw new Error(Err.getMessages3);
    }
  });

  return messages as MailboxMessage[];
}

async function getMessage(login: string, domain: string, id: number) {
  const action = "readMessage";
  const url = `${baseUrl}/?action=${action}&login=${login}&domain=${domain}&id=${id}`;
  const res = await fetch(url);
  const message = await res.json();

  if (typeof message !== "object") {
    throw new Error(Err.getMessage1);
  }

  const keys = new Set(Object.keys(message));

  if (
    !keys.has("id") ||
    !keys.has("from") ||
    !keys.has("subject") ||
    !keys.has("date") ||
    !keys.has("attachments") ||
    !keys.has("body") ||
    !keys.has("textBody") ||
    !keys.has("htmlBody")
  ) {
    throw new Error(Err.getMessage2);
  }

  return message as Message;
}

const osecmail = {
  Err,
  generateRandomMailboxes,
  getActiveDomainLists,
  getMessages,
  getMessage,
};

export default osecmail;

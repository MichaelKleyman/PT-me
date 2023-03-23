import axios from 'axios';

export async function GET(request: Request, response: Response) {
  return new Response('Hello, Next.js!');
}

// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json('Hello');
// }

// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const data = await fetch('http://localhost:3001/api/users');
//   const json = await data.json();
//   res.status(200).json(json);

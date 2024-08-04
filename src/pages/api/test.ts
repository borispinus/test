import ips from 'node:os';
import { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers';

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const ip = request.socket.remoteAddress;
  const res = await fetch(`http://ip-api.com/json/${ip}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  response.status(200).json({
    local: request.socket.localAddress,
    remote: request.socket.remoteAddress,
    data: ips.networkInterfaces(),
    headers: request.headers,
  });
};

export default handler;

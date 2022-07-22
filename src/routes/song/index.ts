import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";
const prisma = new PrismaClient();

export const GET = async () => {
    const skip = Math.floor(Math.random() * await prisma.song.count())
    const song = await prisma.song.findMany({take:1, skip:skip})
    return {status: 200, body: {spotifySongId:song[0]?.spotifySongId ?? ""}};
}

export const POST:RequestHandler = async ({request}) => {
    const spotifyLinkRegex = /^https:\/\/open.spotify.com\/track\/(?<id>.+)\?si=.+$/gm
    const body = await request.json();
    const matches = spotifyLinkRegex.exec(body.newSong);
    if (matches === null) {
        return {status: 400, body: {error: "Invalid Spotify link"}}; 
    }
    const id = matches?.groups?.id ?? "";
    console.log(matches);
    const song = await prisma.song.create({data: {spotifySongId:id}});
    return {status: 200, body: song};
}
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, User } from "astro:db";
import { lucia } from "@/auth";

export async function POST(context:APIContext) : Promise<Response> {

    // Parse the incoming request body as form data
    const formData = await context.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // Validate the incoming data
    if ( !username || !password) {
        return new Response(" Username and password are required", { status: 400 });
    }

    if (typeof username !== "string" || username.length < 4) {
        return new Response("Username must be at least 4 characters long.", { status: 400 });
    }

    if (typeof password !== "string" || password.length < 8) {
        return new Response("Password must be at least 8 characters long.", { status: 400 });
    }

    // Insert the new user into the database
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    // Insert the new user into the database
    await db.insert(User).values([{
        id: userId,
        username,
        password: hashedPassword
    }]);

    // Generate a new session for the user
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return context.redirect("/");
}
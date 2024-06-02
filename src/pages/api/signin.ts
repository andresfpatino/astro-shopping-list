import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

export async function POST(context:APIContext) : Promise<Response> {

    // read the form data
    const formData = await context.request.formData();

    // get the username and password from the form data
    const username = formData.get("username");
    const password = formData.get("password");

    // validate the incoming data
    if ( typeof username !== "string"  ) {
        return new Response("Invalid username", { status: 400 });
    }

    if ( typeof password !== "string" ) {
        return new Response("Invalid password", { status: 400 });
    }

    // search for the user in the database
    const foundUser = (
        await db.select().from(User).where(eq(User.username, username))
    ).at(0);

    // if the user is not found, return an error
    if ( !foundUser ) {
        return new Response("Incorrect username or password", { status: 404 });
    }


    // verify if user has password
    if ( !foundUser.password ) {
        return new Response("Invalid password", { status: 404 });
    }

    // compare the password with the hashed password
    const validpAssword = await new Argon2id().verify(foundUser.password, password);

    // if the password is invalid, return an error
    if ( !validpAssword ) {
        return new Response("Incorrect username or password", { status: 404 });
    }

    // password is valid, redirect to the home page
    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return context.redirect("/lists");


}
/**
 * Response helper methods for BunwayContext
 */
export function createResponseHelpers() {
    return {
        json(data: unknown, status: number = 200): Response {
            return new Response(JSON.stringify(data), {
                status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },

        text(text: string, status: number = 200): Response {
            return new Response(text, {
                status,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        },

        html(html: string, status: number = 200): Response {
            return new Response(html, {
                status,
                headers: {
                    'Content-Type': 'text/html',
                },
            });
        },

        redirect(url: string, status: number = 302): Response {
            return new Response(null, {
                status,
                headers: {
                    Location: url,
                },
            });
        },
    };
}
# Custom Directives

Directives help you write texts similar to markdown using a directive keyword. All the pages that contains Contents, support custom directives. Also, some of this page's content has been written in custom directives.

- Make sure to close each directives appropriately to avoid render issues.

### Available Directives:

1. **<span style="color:#a92be2">@pg / @endpg</span>**: an open/close custom directive, allows you to create a new paragraph that gives vertical spaces between two paragraphs. Spaces between any consecutive paragraphs are approximately 32 pixels.
2. **<span style="color:#a92be2">@block / @endblock</span>**: An open/close custom directive, which allows you to enter a new line without creating a new paragraph.
3. **<span style="color:#a92be2">@link</span>**: A functional custom directive, allows you to create a link with given name and URL. The first argument is the link. The second argument is the name of the link
4. **<span style="color:#a92be2">@marker</span>**: a functional custom directive, allows you to mark a text highlighted.

### Example of all previously mentioned directives:

#### Usage:

**<span style="color:#a92be2">@pg</span>** This is a paragraph and **<span style="color:#a92be2">@marker([</span>** this text is highlighted **<span style="color:#a92be2">])</span>**, by using block directive **<span style="color:#a92be2">@block</span>** I can move this line in a new line **<span style="color:#a92be2">@endblock</span>** I can also put **<span style="color:#a92be2">@link([</span>** https://google.com **<span style="color:#a92be2">][</span>** Google **<span style="color:#a92be2">])</span>** link here. now I end the paragrpah **<span style="color:#a92be2">@endpg @pg</span>** This is the start of the second paragraph **<span style="color:#a92be2">@endpg</span>** </p>

#### Output:

This is a paragraph and **<span style="color:#a92be2">this text is highlighted</span>**, by using block directive
I can move this line in a new line
I can also put <a href="https://google.com" className="link">Google</a> link here. now I end the paragrpah

This is the start of the second paragraph

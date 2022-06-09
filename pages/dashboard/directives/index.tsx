import BodyHeader from '@comp/dashboard/BodyHeader';
import { NextPage } from 'next';


const Directives: NextPage = () => {


  return (
    <main className="dashboard-page dashboard-page--sm page">
      <BodyHeader
        action="Custom "
        model="Directives"
      />

      <p>
        Directives help you write texts similar to markdown using a directive keyword. All the pages that contains Contents, support custom directives. Also, some of this page&apos;s content has been written in custom directives.
        <span className="block">- Make sure to close each directives appropriately to avoid render issues.</span>
      </p>
      <div className="text-block">
        <h3>Available Directives:</h3>
        <p>
          1. <span className="marker">
            @pg / @endpg
          </span>
          : an open/close custom directive, allows you to create a new paragraph that gives vertical spaces between two paragraphs. Spaces between any consecutive paragraphs are approximately 32 pixels.
        </p>
        <p>
          2. <span className="marker">
            @block / @endblock
          </span>
          : An open/close custom directive, which allows you to enter a new line without creating a new paragraph.
        </p>

        <p>
          3. <span className="marker">
            @link
          </span>
          : A functional custom directive, allows you to create a link with given name and URL. The first argument is the link. The second argument is the name of the link
        </p>
        <p>
          4. <span className="marker">
            @marker
          </span>
          : a functional custom directive, allows you to mark a text highlighted.
        </p>
      </div>

      <div className="text-block">
        <h2>
          Example of all previously mentioned directives:
        </h2>

        <div className="text-block">
          <h3>Usage:</h3>
          <p>
            <span className="marker">@pg</span> This is a paragraph and <span className="marker">@marker([</span>this text is highlighted<span className="marker">])</span>, by using block directive <span className="marker">@block</span> I can move this line in a new line <span className="marker">@endblock</span> I can also put <span className="marker">@link([</span> https://google.com<span className="marker">][</span>Google<span className="marker">])</span> link here. now I end the paragrpah <span className="marker">@endpg @pg</span> This is the start of the second paragraph <span className="marker">@endpg</span>
          </p>
        </div>

        <div className="text-block">
          <h3>Output:</h3>
          <p>
            This is a paragraph and <span className="marker">this text is highlighted</span>, by using block directive <span className="block"> I can move this line in a new line </span> I can also put <a href="https://google.com" className="link">Google</a>link here. now I end the paragrpah
          </p>
          <p> This is the start of the second paragraph </p>
        </div>
      </div>


    </main >
  )
}


export default Directives

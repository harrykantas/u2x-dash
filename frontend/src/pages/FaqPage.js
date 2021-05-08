import React from "react";

const FaqPage = () => {

  return (
    <div>
      <br />
      <br />
      <h2><strong>Frequently Asked Questions</strong></h2>
      <br />
      <h3><strong>Q: Is this stats portal official?</strong></h3>
      <h3>
	  A: No. This is 100% made by U2 fans, for U2 fans. We are using data that is publicly available from SiriusXM.<br />
	  SiriusXM could at any point change the way they serve this data, or ask us to stop using it.<br />
          Please do not go to SiriusXM looking for support with this page. :)
      </h3>
      <br />
      <h3><strong>Q: How accurate is the data presented?</strong></h3>
      <h3>
	  A: Quite accurate. You may see some titles being truncated, or a few typos here and there, but all of this is coming from the source, in this case SiriusXM. 
	  We correct most of them where we can.<br />
          You might also spot some oddities with the albums, for example songs from Zooropa listed under Achtung Baby. 
	  This is because SiriusXM uses the Achtung Baby collection, which includes Zooropa.<br />
	  We avoid building any stats that might include confusing data like that, which is why you will not see many charts involving album names, if any at all.
      </h3>
      <br />
      <h3><strong>Q: Could you add chart X or feature Y?</strong></h3>
      <h3>
	  A: The data we have access to is fairly restrictive, and we are therefore limited to the stats we can derive from it.<br />
	  All feedback is welcome however, and we are always looking at ways to enhance what is already there.
      </h3>
      <br />
      <h3><strong>Q: I don't understand what chart X is supposed to be showing, how can I find out more?</strong></h3>
      <h3>
	  A: Click on the little question mark on the right side of the chart, to get a small description of what it is. ;)
      </h3>
      <br />
      <h3><strong>Q: I see the terms "Song" and "Track" used. Are they interchangeable?</strong></h3>
      <h3>
	  A: Not quite. Sometimes we will present stats on tracks, sometimes on songs. The convention for this page is that by "Track" we refer to a version of a song.<br />
	  For example, "11 O'Clock Tick Tock" is a song, whereas "11 O'Clock Tick Tock (Single Version)" and "11 O'Clock Tick Tock (Long Version)" are different tracks for that song.
      </h3>
      <br />
      <br />
      <br />
      <br />
      <p>(c) @harrykantas for @u2songs, 2020</p>
    </div>
  );

};

export default FaqPage;

import React from "react";

import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

// The desired locales.
import en from "javascript-time-ago/locale/en";

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

export default function LastSeen({ date }) {
  return (
    <div className="timestamp">
      Last Updated: <ReactTimeAgo date={date} />
    </div>
  );
}

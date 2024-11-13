import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const ShortenedURL = ({ urls, onDelete }) => {
  return (
    <ul className="url-list">
      {urls.map((url) => (
        <li key={url.shortCode} className="url-list-item">
          <a
            href={`http://localhost:5000/shortlinks/${url.shortCode}`}
            target="_blank"
            rel="noreferrer"
          >
            {url.shortCode}
          </a>
          <DeleteIcon
            className="delete-icon"
            onClick={() => onDelete(url.shortCode)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ShortenedURL;

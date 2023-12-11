import React from "react";
import _ from "lodash";

export class PaginationFooter extends React.Component {
  render() {
    const { totalRecords, pageNo, limit } = this.props;
    let getReminder = totalRecords % limit;
    let totalPages = 0;
    if (getReminder > 0) {
      totalPages = (totalRecords - getReminder) / limit + 1;
    } else {
      totalPages = totalRecords / limit;
    }
    let pagesCount = [];
    if (totalPages > 0 && totalPages < 8) {
      for (let i = 1; i <= totalPages; i++) {
        pagesCount.push(
          <li
            key={i}
            onClick={() => this.props.getPageData(i)}
            className={pageNo === i ? "page-item active" : "page-item"}
          >
            <div className="page-link pointer-cursor">{i}</div>
          </li>
        );
      }
    } else {
      /*********Pagination with dots for more than 7 pages**********/
      let current = pageNo,
        last = totalPages,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
      /*********End of Pagination with dots for more than 7 pages**********/

      // Parsed pages to show on UI as required.
      _.map(rangeWithDots, (pageVal, pageKey) => {
        pagesCount.push(
          pageVal === "..." ? (
            <li
              key={pageKey}
              className={pageNo === pageVal ? "page-item active" : "page-item"}
            >
              <div className="page-link ">{pageVal}</div>
            </li>
          ) : (
            <li
              key={pageKey}
              onClick={() => this.props.getPageData(pageVal)}
              className={pageNo === pageVal ? "page-item active" : "page-item"}
            >
              <div className="page-link pointer-cursor">{pageVal}</div>
            </li>
          )
        );
      });
    }

    let pagesCountHtml = _.map(pagesCount, (html) => html);

    return (
      <nav className="boot_pagination w-100 position-relative mt-3">
        <ul className="pagination">
          {/* <li class="page-item disabled"> */}
          <li
            onClick={() =>
              pageNo > 1 ? this.props.getPageData(pageNo - 1) : ""
            }
            className={pageNo > 1 ? "page-item" : "page-item disabled"}
          >
            <a
              className="page-link"
              href="#previous"
              onClick={(e) => e.preventDefault()}
            >
              <span className="mdi-navigation-left">Previous</span>
            </a>
          </li>
          {/* <li class="page-item"><a class="page-link" href="#">1</a></li> */}
          {pagesCountHtml}
          <li
            onClick={() =>
              pageNo < totalPages ? this.props.getPageData(pageNo + 1) : ""
            }
            className={pageNo < totalPages ? "page-item" : "page-item disabled"}
          >
            <a
              className="page-link"
              href="#next"
              onClick={(e) => e.preventDefault()}
            >
              <span className="mdi-navigation-right">Next</span>
            </a>
            {/* <a class="page-link" href="#">Next</a> */}
          </li>
        </ul>
      </nav>
    );
  }
}

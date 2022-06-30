import common from "../common/webhook-props.mjs";
import issueCreatedInstant from "../../../linear_app/sources/issue-created-instant/issue-created-instant.mjs";

/* eslint-disable pipedream/required-properties-type */
/* eslint-disable pipedream/required-properties-name */
/* eslint-disable pipedream/required-properties-version */

export default {
  ...issueCreatedInstant,
  key: "linear-issue-created-instant",
  description: "Emit new event when a new issue is created (OAuth). See the docs [here](https://developers.linear.app/docs/graphql/webhooks)",
  props: {
    ...common.props,
  },
};

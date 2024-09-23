/**
 * @generated SignedSource<<25270789cecd70f193995068a0a0a67f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type users_insert_input = {
  email?: string | null | undefined;
  id?: any | null | undefined;
  password?: string | null | undefined;
  username?: string | null | undefined;
};
export type useHasuraSignUpMutation$variables = {
  userData: ReadonlyArray<users_insert_input>;
};
export type useHasuraSignUpMutation$data = {
  readonly insert_users: {
    readonly returning: ReadonlyArray<{
      readonly email: string | null | undefined;
      readonly id: string;
      readonly password: string | null | undefined;
      readonly username: string | null | undefined;
    }>;
  } | null | undefined;
};
export type useHasuraSignUpMutation = {
  response: useHasuraSignUpMutation$data;
  variables: useHasuraSignUpMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userData"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "objects",
        "variableName": "userData"
      }
    ],
    "concreteType": "users_mutation_response",
    "kind": "LinkedField",
    "name": "insert_users",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "users",
        "kind": "LinkedField",
        "name": "returning",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "password",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useHasuraSignUpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useHasuraSignUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "96430891685c82ebe4d781b7b80d21b6",
    "id": null,
    "metadata": {},
    "name": "useHasuraSignUpMutation",
    "operationKind": "mutation",
    "text": "mutation useHasuraSignUpMutation(\n  $userData: [users_insert_input!]!\n) {\n  insert_users(objects: $userData) {\n    returning {\n      email\n      id\n      password\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3ebf951852fde1b1e900b647a21655f7";

export default node;

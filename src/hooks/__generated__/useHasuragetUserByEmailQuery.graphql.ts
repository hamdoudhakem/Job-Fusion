/**
 * @generated SignedSource<<83142dbcd30bf764c815bdeb6933998d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useHasuragetUserByEmailQuery$variables = {
  email: string;
};
export type useHasuragetUserByEmailQuery$data = {
  readonly users_connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly password: string | null | undefined;
        readonly username: string | null | undefined;
      };
    }>;
  };
};
export type useHasuragetUserByEmailQuery = {
  response: useHasuragetUserByEmailQuery$data;
  variables: useHasuragetUserByEmailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_eq",
                "variableName": "email"
              }
            ],
            "kind": "ObjectValue",
            "name": "email"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "UsersConnection",
    "kind": "LinkedField",
    "name": "users_connection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UsersEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "users",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useHasuragetUserByEmailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useHasuragetUserByEmailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88cb32d2788a6f15cab1a26e16a0c663",
    "id": null,
    "metadata": {},
    "name": "useHasuragetUserByEmailQuery",
    "operationKind": "query",
    "text": "query useHasuragetUserByEmailQuery(\n  $email: String!\n) {\n  users_connection(where: {email: {_eq: $email}}) {\n    edges {\n      node {\n        id\n        password\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc16ccf3cb274b8c26aa3fce06a1c02d";

export default node;

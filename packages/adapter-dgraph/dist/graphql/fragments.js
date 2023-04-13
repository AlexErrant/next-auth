"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationToken = exports.Session = exports.Account = exports.User = void 0;
exports.User = `
  fragment UserFragment on User {
    email
    id
    image
    name
    emailVerified
  }
`;
exports.Account = `
  fragment AccountFragment on Account {
    id
    type
    provider
    providerAccountId
    expires_at
    token_type
    scope
    access_token
    refresh_token
    id_token
    session_state
  }
`;
exports.Session = `
  fragment SessionFragment on Session {
    expires
    id
    sessionToken
  }
`;
exports.VerificationToken = `
  fragment VerificationTokenFragment on VerificationToken {
    identifier
    token
    expires
  }
`;

export interface Recipient {
  object: string;
  id: number;
  emailAddress: string;
  fullName: string;
  created: string;
  isPaused: boolean;
  first: string;
  last: string;
  fields: {
    albumname: string;
    artistname: string;
    email: string;
    favorite_color: string;
    first: string;
    last: string;
    name: string;
    unsubscribeUrl: string;
    fullname: string;
  };

  /*id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;*/
}

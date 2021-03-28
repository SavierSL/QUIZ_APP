import { useGetStudentv2Query } from "../../generated/graphql";

export interface StudentBoxProps {
  studentId: number;
}

const StudentBox: React.FC<StudentBoxProps> = ({ studentId }) => {
  const { data: StudentEmail } = useGetStudentv2Query({
    variables: { studentId },
  });
  console.log(StudentEmail?.getStudentv2.email);
  return <>{StudentEmail?.getStudentv2.email}</>;
};

export default StudentBox;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Card, Textarea, Typography } from "@material-tailwind/react";
import { LANGUAGES as languages } from "@/constants/language";
interface Props {
  setLanguage: (value: string) => void;
}
function ProblemDetialsCard({ setLanguage }: Props) {
  return (
    <>
      <Card
        className="p-5 w-full bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
        placeholder=""
      >
        <div className="mb-5">
          <Typography variant="h4" color="white" className="" placeholder="">
            Problem Details
          </Typography>
        </div>
        <div className="p-5">
          <Typography variant="lead" color="white" className="" placeholder="">
            Problem Name
          </Typography>
          <input className="bg-transparent focus:outline-none  focus:border-none border-white border focus:outline-green-800 h-5 w-60 rounded text-lg text-white p-5 font-bold"></input>
        </div>
        <div className="p-5">
          <Typography variant="lead" color="white" className="" placeholder="">
            Problem Description
          </Typography>
          <Textarea
            color="green"
            spellCheck="true"
            className=" text-black font-bold border h-52 border-white"
            label="Description"
            style={{ color: "white", fontSize: "18px" }}
          />
        </div>
        <div className="w-full flex justify-around">
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Problem Difficulty
            </Typography>
            <Select>
              <SelectTrigger className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg  dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-none font-bold">
                <SelectItem
                  value="light"
                  className="hover:bg-dark-100/60 text-green-600"
                >
                  Easy
                </SelectItem>
                <SelectItem
                  value="dark"
                  className="hover:bg-dark-100/60 text-yellow-600"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="system"
                  className="hover:bg-dark-100/60 text-red-600"
                >
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Language
            </Typography>
            <div className="bg-black">
              <Select onValueChange={(value) => setLanguage(value)}>
                <SelectTrigger className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg  dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-none">
                  {languages.map((language: string, index) => (
                    <SelectItem
                      key={index}
                      value={language}
                      className="hover:bg-dark-100/60"
                    >
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProblemDetialsCard;
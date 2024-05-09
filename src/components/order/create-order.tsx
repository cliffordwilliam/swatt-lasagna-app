"use client";

import { FunctionComponent, useEffect, useState } from "react";
import PembelisList, { Pembeli } from "@/components/pembeli/pembelis-list";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CreateOrderProps {
  getToken: () => Promise<string>;
}

const CreateOrder: FunctionComponent<CreateOrderProps> = ({ getToken }) => {
  const [pembeli, setPembeli] = useState({} as Pembeli);

  const onPilihClicked = (pembeli: Pembeli) => {
    setPembeli(pembeli);
  };

  return (
    <>
      {/* TODO: Edit order */}
      {/* TODO: Guard if have not finished selecting */}
      {/* TODO: Penerima, orderitem */}
      {/* Pembeli */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>
            <ChevronsUpDown className="mr-2 h-4 w-4" />
            <span>Pilih / Ubah pembeli</span>
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <PembelisList
            getToken={getToken}
            isOrderMode={true}
            onPilihClicked={onPilihClicked}
          />
        </CollapsibleContent>
      </Collapsible>
      {Object.keys(pembeli).length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{pembeli.nama}</CardTitle>
            <CardDescription>{pembeli.alamat}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{pembeli.noHp}</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Pembeli belum di pilih</CardTitle>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default CreateOrder;

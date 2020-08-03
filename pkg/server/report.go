package server

import (
  "github.com/JetBrains/ij-perf-report-aggregator/pkg/data-query"
  "github.com/develar/errors"
  "net/http"
)

func (t *StatsServer) handleReportRequest(request *http.Request) ([]byte, error) {
  query, err := data_query.ReadQuery(request)
  if err != nil {
    return nil, err
  }

  query.Fields = []data_query.DataQueryDimension{{Name: "raw_report"}}
  var rawReport []byte
  row, err := data_query.SelectRow(query, "report", t, request.Context())
  if err != nil {
    return nil, err
  }

  err = row.Scan(&rawReport)
  if err != nil {
    return nil, errors.WithStack(err)
  }
  return rawReport, nil
}